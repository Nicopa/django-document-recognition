

# Document Recognition App

## Overview
This application is designed to recognize and process documents efficiently. It supports some image types and provides features for exporting and importing the field set if you need to reload the page.

## Main Tech Stacks

- Python;
- OpenAI Python library;
- Django;
- Tailwind CSS;

## Features
- **Document Recognition**: Automatically extracts and processes data from supported document types.
- **Field Management**: Customize and manage fields for document data extraction.

## Usage

### Getting Started
1. Configure fields as needed;
2. Select the file you want to process (ensure it meets the supported file type and size requirements);
3. Click on "Submit";
4. After a few seconds, the JSON response will appear on the bottom of the page.

### Supported File Types
The application supports the following file types for recognition:
- Images (`.jpg`, `.jpeg`, `.png`);

### File Size Limitations
- Maximum file size: **10 MB** per document.

### Fields
The application uses fields to extract and organize data from documents. Below are the key fields and their purposes:
- **Name**: The name/title of the field;
- **Description**: A brief explanation or context about the field;
- **Type**: The expected data type from the field. It supports some fields of [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs#supported-schemas)
- **Array Type**: If the type is Array, you must specify the data type of the items;

### Export/Import Feature
#### Export
- The export feature allows you to save processed document data into a JSON file.
- This is useful for backing up data or transferring it to another system.

#### Import
- The import feature enables you to load previously saved JSON files into the application.
- This allows you to restore data or continue working on previously processed documents.

#### Steps:
1. **Export**:
   - After processing a document, click the "Export" button.
   - Choose a location to save the JSON file.
2. **Import**:
   - Click the "Import" button.
   - Select a JSON file containing previously saved data.

## Development

1. Create a `.env` file and save the OpenAI API key on it:
```
OPENAI_API_KEY=sk-proj-encrypted...
```

1. If you need to update Tailwind classes, run the watch mode:
```
python manage.py tailwind start
```

2. Run the server:
```
python manage.py runserver
```

3. http://localhost:8000

## Contributing
Feel free to contribute to this project by submitting issues or pull requests.