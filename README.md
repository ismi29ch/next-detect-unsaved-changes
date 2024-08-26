```markdown
# useDetectUnsavedChanges

`useDetectUnsavedChanges` is a custom React hook designed to help manage unsaved changes in your application. It allows you to prevent users from navigating away or reloading the page if there are unsaved changes, by displaying a custom modal or dialog.

## Features

- Detects unsaved changes when a user attempts to navigate away or reload the page.
- Provides a boolean state to control whether navigation should be blocked.
- Easily integrates with custom modals or dialogs to handle user confirmation.

## Installation

To install `useDetectUnsavedChanges`, you can use npm or yarn:

```bash
npm install use-detect-unsaved-changes
```

or

```bash
yarn add use-detect-unsaved-changes
```

## Usage

### Basic Example

Here's a basic example of how to use the `useDetectUnsavedChanges` hook in a React component:

```javascript
import React, { useState } from 'react';
import { useDetectUnsavedChanges } from 'use-detect-unsaved-changes';

const MyFormComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isDirty, setIsDirty] = useState(false);
  const blockNavigation = useDetectUnsavedChanges(isDirty);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsDirty(true);
  };

  const handleSave = () => {
    // Perform save operation
    setIsDirty(false);
  };

  return (
    <>
      <form>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSave}>Save</button>
      </form>

      {blockNavigation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Unsaved Changes</h2>
            <p>You have unsaved changes. Are you sure you want to leave this page?</p>
            <button onClick={() => { /* logic to confirm navigation */ }}>Yes, Leave</button>
            <button onClick={() => { /* logic to cancel navigation */ }}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyFormComponent;
```

### API

#### `useDetectUnsavedChanges(unsavedChanges: boolean)`

**Parameters:**

- `unsavedChanges` (boolean): A flag indicating whether there are unsaved changes.

**Returns:**

- `blockNavigation` (boolean): Returns `true` if navigation should be blocked due to unsaved changes; otherwise `false`.

## Custom Modal Integration

You can use the `blockNavigation` state to conditionally render a custom modal or dialog for handling unsaved changes. For example:

```javascript
{blockNavigation && (
  <div className="modal">
    <div className="modal-content">
      <h2>Unsaved Changes</h2>
      <p>You have unsaved changes. Are you sure you want to leave this page?</p>
      <button onClick={() => { /* logic to confirm navigation */ }}>Yes, Leave</button>
      <button onClick={() => { /* logic to cancel navigation */ }}>Cancel</button>
    </div>
  </div>
)}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

For more information, please refer to the official documentation or reach out with any questions or feedback.
```

### Notes:
- Replace `use-detect-unsaved-changes` with the actual package name if it’s different.
- Adjust the paths and file names if needed.
- Include a LICENSE file if you are distributing the package with an open-source license.