import { useState, useEffect } from "react";
import Router from "next/router";

/**
 * Custom hook to detect unsaved changes and prevent navigation if necessary.
 *
 * @returns {boolean} - Returns `true` if navigation should be blocked; otherwise `false`.
 */
export const useDetectUnsavedChanges = <T>(unsavedChanges: T): boolean => {
  const [blockNavigation, setBlockNavigation] = useState(false);

  useEffect(() => {
    /**
     * Handles the `beforeunload` event to prompt the user when they attempt
     * to reload or close the page with unsaved changes.
     *
     * @returns {string} - Returns a confirmation message to display to the user.
     */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        const confirmationMessage =
          "You have unsaved changes. Do you really want to leave?";
        e.preventDefault();
        e.returnValue = confirmationMessage; // For most browsers
        return confirmationMessage; // For some older browsers
      }
    };

    // Attach the `beforeunload` event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    /**
     * Handles route change attempts within the app. Prevents navigation
     * if there are unsaved changes by simulating an error.
     */
    const handleRouteChangeStart = () => {
      if (unsavedChanges) {
        setBlockNavigation(true);
        Router.events.emit("routeChangeError");
        throw "Abort route change. Please ignore this error.";
      }
    };

    // Attach the route change event listener
    Router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      // Cleanup the event listeners on component unmount or when `unsavedChanges` changes
      window.removeEventListener("beforeunload", handleBeforeUnload);
      Router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [unsavedChanges]);

  return blockNavigation;
};

interface DetectUnsavedChangesProviderProps<T> {
  unsavedChanges: T;
  children: React.ReactNode;
}

export const DetectUnsavedChangesProvider = <T>({
  unsavedChanges,
  children,
}: DetectUnsavedChangesProviderProps<T>) => {
  const shouldBlockNavigation = useDetectUnsavedChanges(unsavedChanges);

  if (shouldBlockNavigation) return children;
  return null;
};
