
```markdown
# useDetectUnsavedChanges

`useDetectUnsavedChanges` is a custom React hook and component designed to help manage unsaved changes in your application. It allows you to prevent users from navigating away or reloading the page if there are unsaved changes, by displaying a custom modal or dialog.

## Features

- Detects unsaved changes when a user attempts to navigate away or reload the page.
- Provides a boolean state to control whether navigation should be blocked.
- Includes a `DetectUnsavedChanges` component to simplify usage and conditional rendering.

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

### Custom Hook

Here's how to use the `useDetectUnsavedChanges` hook in a React component:

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

### DetectUnsavedChanges Component

For an easier integration, you can use the `DetectUnsavedChanges` component:

```javascript
import React from 'react';
import { DetectUnsavedChanges } from 'use-detect-unsaved-changes';

const MyFormComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isDirty, setIsDirty] = useState(false);

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
    <DetectUnsavedChanges unsavedChanges={isDirty}>
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
      {/* Add your custom modal or dialog here */}
    </DetectUnsavedChanges>
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

#### `DetectUnsavedChanges`

**Props:**

- `unsavedChanges` (boolean): A flag indicating whether there are unsaved changes.
- `children` (React.ReactNode): The content to be conditionally rendered based on unsaved changes.

**Returns:**

- Renders `children` if navigation should be blocked; otherwise, renders nothing.

## Custom Modal Integration

You can use the `blockNavigation` state or the `DetectUnsavedChanges` component to conditionally render a custom modal or dialog for handling unsaved changes. For example:

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

This updated README includes information on how to use the `DetectUnsavedChanges` component along with the `useDetectUnsavedChanges` hook, making it easier for users to integrate unsaved changes detection into their applications.