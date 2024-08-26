# next-detect-unsaved-changes

This is a package that attempts to detect unsaved changes in a NextJs Application.

## Supported Versions

- React 16.8+
- Next.js 10+

## Installation

```bash
npm install next-detect-unsaved-changes
```

or

```bash
yarn add next-detect-unsaved-changes
```

## Usage

### Custom Hook

```javascript
import { useDetectUnsavedChanges } from 'next-detect-unsaved-changes';

const MyComponent = () => {
  const [isDirty, setIsDirty] = useState(false);
  const blockNavigation = useDetectUnsavedChanges(isDirty);

  // Your component logic

  return (
    <>
      {/* Your component JSX */}
    </>
  );
};
```

### Provider Component

```javascript
import { DetectUnsavedChangesProvider } from 'next-detect-unsaved-changes';

const MyComponent = () => {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <DetectUnsavedChangesProvider unsavedChanges={isDirty}>
      {/* Your component JSX */}
      <div>Your modal or dialog here</div>
    </DetectUnsavedChangesProvider>
  );
};
```

## API

- **`useDetectUnsavedChanges(unsavedChanges: boolean): boolean`**  
  Returns `true` if navigation should be blocked due to unsaved changes.

- **`DetectUnsavedChangesProvider`**  
  Props:
  - `unsavedChanges` (boolean): Indicates if there are unsaved changes.
  - `children` (React.ReactNode): Content to conditionally render based on unsaved changes.

## License

MIT License. See [LICENSE](LICENSE) for details.
```

This README provides essential information in a concise format, covering installation, usage, and API details for the `useDetectUnsavedChanges` package.