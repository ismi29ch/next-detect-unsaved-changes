"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = __importDefault(require("next/router"));
const useUnsavedChangesHandler = (notSaved, customMessage) => {
    const confirmationMessage = customMessage || "Changes you made may not be saved.";
    (0, react_1.useEffect)(() => {
        const beforeUnloadHandler = (e) => {
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        };
        const beforeRouteHandler = (url) => {
            if (router_1.default.pathname !== url && !confirm(confirmationMessage)) {
                router_1.default.events.emit("routeChangeError");
                throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
            }
        };
        if (notSaved) {
            window.addEventListener("beforeunload", beforeUnloadHandler);
            router_1.default.events.on("routeChangeStart", beforeRouteHandler);
        }
        else {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            router_1.default.events.off("routeChangeStart", beforeRouteHandler);
        }
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            router_1.default.events.off("routeChangeStart", beforeRouteHandler);
        };
    }, [notSaved, confirmationMessage]);
};
exports.default = useUnsavedChangesHandler;
