const fieldsContainer = document.getElementById('fieldsContainer');
const addFieldButton = document.getElementById('addFieldButton');
//let's store the inputs and selects in an array to be able to access them later
let fields = [];

function createFieldContainer() {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container mt-2';
    return fieldContainer;
}

function createNameField() {
    const container = createFieldContainer();
    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.name = 'fieldName[]';
    nameField.placeholder = 'Name*';
    nameField.className = 'name-field w-full';
    nameField.required = true;
    container.appendChild(nameField);
    return { container, nameField };
}

function createDescriptionField() {
    const container = createFieldContainer();
    const descriptionField = document.createElement('input');
    descriptionField.type = 'text';
    descriptionField.name = 'fieldDescription[]';
    descriptionField.placeholder = 'Description';
    descriptionField.className = 'description-field w-full';
    container.appendChild(descriptionField);
    return { container, descriptionField };
}

function createTypeField() {
    const container = createFieldContainer();
    const typeSelect = document.createElement('select');
    typeSelect.name = 'fieldType[]';
    typeSelect.className = 'type-select w-full';
    typeSelect.required = true;
    container.appendChild(typeSelect);

    const options = ['String', 'Number', 'Boolean', 'Integer', 'Object', 'Array', 'Enum'];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        typeSelect.appendChild(opt);
    });

    return { container, typeSelect };
}

function createArrayTypeField() {
    const container = createFieldContainer();
    container.style.display = 'none';
    const arrayTypeSelect = document.createElement('select');
    arrayTypeSelect.name = 'arrayElementType[]';
    arrayTypeSelect.className = 'array-type-select w-full';
    container.appendChild(arrayTypeSelect);

    const arrayOptions = ['String', 'Number', 'Boolean', 'Integer'];
    arrayOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        arrayTypeSelect.appendChild(opt);
    });

    return { container, arrayTypeSelect };
}

function createRemoveButton(listener) {
    const container = document.createElement('div');
    container.className = 'remove-button-container mt-2 place-content-center';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Remove';
    button.className = 'remove-button rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50';
    button.addEventListener('click', listener);
    container.appendChild(button);
    return container;
}

function createNestedForm(container, index) {
    container.innerHTML = ''; // Clear any existing nested form

    const nestedFieldsContainer = document.createElement('div');
    nestedFieldsContainer.className = 'nested-fields-container';

    const addNestedFieldButton = document.createElement('button');
    addNestedFieldButton.type = 'button';
    addNestedFieldButton.className = 'nested-add-button mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50';
    addNestedFieldButton.textContent = 'Add Nested Field';

    addNestedFieldButton.addEventListener('click', () => {
        const nestedFieldSet = document.createElement('div');
        nestedFieldSet.className = 'field-set field-grid grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-4';

        const nestedNameContainer = createFieldContainer();
        const nestedNameInput = document.createElement('input');
        nestedNameInput.type = 'text';
        nestedNameInput.name = 'nestedFieldName[]';
        nestedNameInput.placeholder = 'Nested Name*';
        nestedNameInput.className = 'nested-name-field w-full';
        nestedNameInput.required = true;
        nestedNameContainer.appendChild(nestedNameInput);

        const nestedDescriptionContainer = createFieldContainer();
        const nestedDescriptionInput = document.createElement('input');
        nestedDescriptionInput.type = 'text';
        nestedDescriptionInput.name = 'nestedFieldDescription[]';
        nestedDescriptionInput.placeholder = 'Description';
        nestedDescriptionInput.className = 'nested-description-field w-full';
        nestedDescriptionContainer.appendChild(nestedDescriptionInput);

        const nestedTypeContainer = createFieldContainer();
        const nestedTypeSelect = document.createElement('select');
        nestedTypeSelect.name = 'nestedFieldType[]';
        nestedTypeSelect.className = 'nested-type-select w-full';
        nestedTypeSelect.required = true;
        nestedTypeContainer.appendChild(nestedTypeSelect);

        const nestedOptions = ['String', 'Number', 'Boolean', 'Integer'];
        nestedOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            nestedTypeSelect.appendChild(opt);
        });

        const removeButton = createRemoveButton(() => {
            nestedFieldsContainer.removeChild(nestedFieldSet);
        });

        nestedFieldSet.appendChild(nestedNameContainer);
        nestedFieldSet.appendChild(nestedDescriptionContainer);
        nestedFieldSet.appendChild(nestedTypeContainer);
        nestedFieldSet.appendChild(removeButton);
        nestedFieldsContainer.appendChild(nestedFieldSet);
        fields[index].fields = fields[index].fields || [];
        fields[index].fields.push({
            name: nestedNameInput,
            type: nestedTypeSelect,
        });
    });

    container.appendChild(nestedFieldsContainer);
    container.appendChild(addNestedFieldButton);
}

function createEnumForm(container, index) {
    container.innerHTML = ''; // Clear any existing enum form

    const enumFieldsContainer = document.createElement('div');
    enumFieldsContainer.className = 'enum-fields-container';

    const addEnumOptionButton = document.createElement('button');
    addEnumOptionButton.type = 'button';
    addEnumOptionButton.className = 'enum-add-button mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50';
    addEnumOptionButton.textContent = 'Add Enum Option';

    addEnumOptionButton.addEventListener('click', () => {
        const enumFieldSet = document.createElement('div');
        enumFieldSet.className = 'field-set field-grid grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2';

        const enumContainer = createFieldContainer();
        const enumOptionInput = document.createElement('input');
        enumOptionInput.type = 'text';
        enumOptionInput.name = 'enumOption[]';
        enumOptionInput.placeholder = 'Enum Option';
        enumOptionInput.className = 'enum-option-field w-full';
        enumContainer.appendChild(enumOptionInput);

        const removeButton = createRemoveButton(() => {
            enumFieldsContainer.removeChild(enumFieldSet);
        });

        enumFieldSet.appendChild(enumContainer);
        enumFieldSet.appendChild(removeButton);
        enumFieldsContainer.appendChild(enumFieldSet);
        fields[index].enumOptions = fields[index].enumOptions || [];
        fields[index].enumOptions.push({
            option: enumOptionInput,
        });
    });

    container.appendChild(enumFieldsContainer);
    container.appendChild(addEnumOptionButton);
}

addFieldButton.addEventListener('click', () => {
    const fieldSet = document.createElement('div');
    fieldSet.className = 'field-set my-2';
    const fieldGrid = document.createElement('div');
    fieldGrid.className = 'field-grid grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-5';
    const index = fields.length;
    const removeButton = createRemoveButton(() => {
        fieldsContainer.removeChild(fieldSet);
        fields = fields.filter((_, i) => i !== index);
    });

    const { container: nameFieldContainer, nameField} = createNameField();
    const { container: descriptionFieldContainer, descriptionField } = createDescriptionField();
    const { container: typeField, typeSelect } = createTypeField();
    const { container: arrayTypeSelectContainer, arrayTypeSelect } = createArrayTypeField();

    const nestedFormContainer = document.createElement('div');
    nestedFormContainer.className = 'nested-form ml-8';
    nestedFormContainer.style.display = 'none';

    const enumFormContainer = document.createElement('div');
    enumFormContainer.className = 'enum-form';
    enumFormContainer.style.display = 'none';

    typeSelect.addEventListener('change', () => {
        if (typeSelect.value === 'Array') {
            arrayTypeSelectContainer.style.display = 'block';
            nestedFormContainer.style.display = 'none';
            enumFormContainer.style.display = 'none';
        } else if (typeSelect.value === 'Object') {
            arrayTypeSelectContainer.style.display = 'none';
            nestedFormContainer.style.display = 'block';
            enumFormContainer.style.display = 'none';
            createNestedForm(nestedFormContainer, index);
        } else if (typeSelect.value === 'Enum') {
            arrayTypeSelectContainer.style.display = 'none';
            nestedFormContainer.style.display = 'none';
            enumFormContainer.style.display = 'block';
            createEnumForm(enumFormContainer, index);
        } else {
            arrayTypeSelectContainer.style.display = 'none';
            nestedFormContainer.style.display = 'none';
            enumFormContainer.style.display = 'none';
        }
    });

    fieldGrid.appendChild(nameFieldContainer);
    fieldGrid.appendChild(descriptionFieldContainer);
    fieldGrid.appendChild(typeField);
    fieldGrid.appendChild(arrayTypeSelectContainer);
    fieldSet.appendChild(fieldGrid);
    fieldSet.appendChild(nestedFormContainer);
    fieldSet.appendChild(enumFormContainer);
    fieldGrid.appendChild(removeButton);
    fields.push({ name: nameField, description: descriptionField, type: typeSelect, arrayType: arrayTypeSelect });
    fieldsContainer.appendChild(fieldSet);
});
document.addEventListener('DOMContentLoaded', () => {
    addFieldButton.click();
});

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const previewContainer = document.getElementById('preview');
    const filePlaceholder = document.getElementById('filePlaceholder');
    const file = event.target.files[0];

    if (file) {
        fileNameDisplay.innerHTML = `Selected file: ${file.name}<br/>Size: ${(file.size / (1024 * 1024)).toPrecision(2)} MB`;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                filePlaceholder.style.display = 'none';
                const img = document.createElement('img');
                img.src = reader.result;
                img.alt = 'Preview';
                img.className = 'max-w-full max-h-64 object-contain';
                img.style.maxHeight = '600px';
                previewContainer.prepend(img);
            };
            reader.readAsDataURL(file);
        } else {
            const paragraph = document.createElement('p');
            paragraph.textContent = `File type: ${file.type}`;
            paragraph.className = 'text-gray-500 text-center';
            previewContainer.prepend(paragraph);
        }
    } else {
        fileNameDisplay.textContent = 'No file selected';
        const paragraph = document.createElement('p');
        paragraph.textContent = 'No file selected';
        paragraph.className = 'text-gray-500 text-center';
        previewContainer.prepend(paragraph);
    }
});

function validateFields() {
    //check if all names are unique
    const names = fields.map(f => f.name.value);
    const uniqueNames = new Set(names);
    if (names.length !== uniqueNames.size) {
        alert('Field names must be unique.');
        return false;
    }
    //check if all names are filled
    const emptyNames = fields.filter(f => f.name.value === '');
    if (emptyNames.length > 0) {
        alert('All field names must be filled.');
        return false;
    }
    return true;
}

const form = document.getElementById('recognitionForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateFields()) {
        return;
    }

    const formData = new FormData(form);
    const file = formData.get('fileInput');
    let fileBase64 = null;
    if (file) {
        fileBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result)
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const jsonData = {
        fields: fields.map(f => ({
            name: f.name.value,
            description: f.description.value,
            type: f.type.value,
            arrayType: f.type.value === 'Array' ? f?.arrayType?.value : undefined,
            fields: f.type.value === 'Object' ? f?.fields.map((nf) => ({
                name: nf.name.value,
                type: nf.type.value,
            })) : undefined,
            enumOptions: f.type.value === 'Enum' ? f?.enumOptions.map((eo) => eo.option.value) : undefined,
        })),
        file: fileBase64,
    };

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '<p class="text-gray-500 text-center">Loading...</p>';
    resultContainer.style.display = 'block';

    fetch('/recognize', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(async (response) => {
        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                body: await response.text()
            };
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', JSON.stringify(data, null, 2));
        resultContainer.innerHTML = `
            <h2 class="text-lg font-semibold">Recognition Result:</h2>
            <pre class="bg-gray-100 p-4 rounded-md">${JSON.stringify(data, null, 2)}</pre>
        `;
    })
    .catch(error => {
        console.error(error);
        resultContainer.innerHTML = `
            <h2 class="text-lg font-semibold">Error:</h2>
            <pre class="bg-red-100 p-4 rounded-md">${error.status} ${error.statusText}</pre>
            <p class="text-gray-500">URL: ${error.url}</p>
            <p class="text-gray-500">Response: ${error.body}</p>
        `;
    });
});

function exportFields() {
    const data = fields.filter(f => !!f.name.value).map(f => ({
        name: f.name.value,
        description: f.description.value,
        type: f.type.value,
        arrayType: f.type.value === 'Array' ? f?.arrayType?.value : undefined,
        fields: f.type.value === 'Object' ? f?.fields.map(nf => ({
            name: nf.name.value,
            type: nf.type.value,
        })) : undefined,
        enumOptions: f.type.value === 'Enum' ? f?.enumOptions.map(eo => eo.option.value) : undefined,
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fields_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importFields(event) {
    const file = event.target.files[0];
    if (!file) {
        console.error('No file selected');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            fieldsContainer.innerHTML = '';
            fields = [];
            data.forEach(fieldData => {
                addFieldButton.click();
                const field = fields[fields.length - 1];
                field.name.value = fieldData.name || '';
                field.description.value = fieldData.description || '';
                field.type.value = fieldData.type || '';
                field.type.dispatchEvent(new Event('change'));

                if (fieldData.type === 'Array') {
                    field.arrayType.value = fieldData.arrayType || '';
                } else if (fieldData.type === 'Object') {
                    const nestedAddButton = field.name.parentElement.parentElement.nextSibling.querySelector('.nested-add-button');
                    fieldData.fields?.forEach(nestedField => {
                        nestedAddButton.click();
                        const nestedFieldSet = field.fields[field.fields.length - 1];
                        nestedFieldSet.name.value = nestedField.name || '';
                        nestedFieldSet.type.value = nestedField.type || '';
                    });
                } else if (fieldData.type === 'Enum') {
                    const enumAddButton = field.name.parentElement.parentElement.nextSibling.nextSibling.querySelector('.enum-add-button');
                    fieldData.enumOptions?.forEach(enumOption => {
                        enumAddButton.click();
                        const enumFieldSet = field.enumOptions[field.enumOptions.length - 1];
                        enumFieldSet.option.value = enumOption || '';
                    });
                }
            });
        } catch (error) {
            alert('Invalid JSON file');
        }
    };
    reader.readAsText(file);
}

document.getElementById('exportFieldsButton').addEventListener('click', exportFields);
document.getElementById('importFieldsInput').addEventListener('change', importFields);