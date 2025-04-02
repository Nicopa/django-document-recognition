from openai import OpenAI
from typing import Any
import json
# from pydantic import create_model

client = OpenAI()

def get_type_from_field(field_type: str) -> str:
    """
    Map field types to JSON data types.
    """
    if field_type == "String":
        return "string"
    elif field_type == "Integer":
        return "integer"
    elif field_type == "Number":
        return "number"
    elif field_type == "Boolean":
        return "boolean"
    elif field_type == "Object":
        return "object"
    elif field_type == "Array":
        return "array"
    elif field_type == "Enum":
        return "string"
    else:
        raise ValueError(f"Unsupported field type: {field_type}")

def get_property(field: dict[str, Any]) -> dict[str, Any]:
    """
    Create a property for the model based on the field provided.
    Examples:
    1. string: {
        "type": "string",
        "description": "Field description",
        "required": True,
    }
    2. array: {
        "type": "array",
        "items": { "type": "string" },
    }
    3. object: {
        "type": "object",
        "properties": {
            "Nested Field": {
                "type": "string",
                "description": "Nested field description",
            },
        },
        "required": ["nested_field_name"],
    }
    4. enum: {
        "type": "string",
        "enum": ["Option 1", "Option 2", "Option 3"],
    }
    """
    description = field.get("description", None)
    property = {
        "type": get_type_from_field(field.get("type")),
    }
    if description:
        property["description"] = description
    if field["type"] == "Array":
        property["items"] = { "type": get_type_from_field(field.get("arrayType", "String")) }
    elif field["type"] == "Object":
        nested_fields = field.get("fields")
        property["properties"] = {}
        property["additionalProperties"] = False
        required = []
        for nested_field in nested_fields:
            # recursive
            nested_field_name = nested_field["name"]
            property["properties"][nested_field_name] = get_property(nested_field)
            required.append(nested_field_name)
        property["required"] = required
    elif field["type"] == "Enum":
        property["enum"] = field.get("enumOptions", [])
    return property

def get_response_format(fields: list[dict[str, Any]]) -> dict[str, Any]:
    """
    Create a response format based on the fields provided.
    """
    properties = {}
    required = []
    for field in fields:
        field_name = field["name"]
        field_property = get_property(field)
        properties[field_name] = field_property
        required.append(field_name)
    return {
        "type": "json_schema",
        "json_schema": {
            "name": "recognition_response",
            "schema": {
                "type": "object",
                "properties": properties,
                "required": required,
                "additionalProperties": False,
            },
            "strict": True,
        },
    }

def recognize(fields: list[dict[str, Any]], base64_encoded_image):
    """
    Recognize the field values in the image.
    """
    #Check if OPENAI_API_KEY is set
    if not client.api_key:
        raise ValueError("OPENAI_API_KEY is not set")
    print(f"Starting recognition process.")
    response_format = get_response_format(fields)
    #print(json.dumps(response_format, indent=1))

    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "You are a data extraction assistant."},
            {
                "role": "user",
                "content": [
                    { "type": "text", "text": "Analyze the image provided and extract the data." },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": base64_encoded_image,
                            "detail": "auto"
                        }
                    },
                ]
            },
        ],
        response_format=response_format,
        temperature=0,
    )

    if completion.choices[0].message.refusal:
        raise ValueError(f"The model refused to answer: {completion.choices[0].message.refusal}")
    print(f"Total tokens used: {completion.usage.total_tokens}")
    parsed = json.loads(completion.choices[0].message.content)
    return parsed
