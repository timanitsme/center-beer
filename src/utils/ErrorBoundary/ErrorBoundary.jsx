import {Component} from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught an error:", error, errorInfo);
        //setTimeout(() => window.location.reload(), 3000);
    }

    render() {
        if (this.state.hasError) {
            return <h1 style={{padding: "200px 0 200px 0", background: "var(--bg)"}} >Произошла ошибка. Страница будет перезагружена...</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;