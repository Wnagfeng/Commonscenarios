
interface Document {
    startViewTransition(callback: () => void): {
        ready: Promise<void>;
    };
}