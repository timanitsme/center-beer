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
    }

    handleGoBackWithReload = () => {
        const previousUrl = document.referrer || "/";
        if (previousUrl !== window.location.href) {
            window.location.href = previousUrl;
        } else {
            window.location.href = "/";
        }
    };

    render() {
        if (this.state.hasError) {
            setTimeout(this.handleGoBackWithReload, 3000);

            return (
                <div
                    style={{
                        padding: "200px 0",
                        background: "var(--bg)",
                        textAlign: "center",
                    }}
                >
                    <h1>Произошла ошибка.</h1>
                    <p>Вы будете автоматически перенаправлены на предыдущую страницу через 3 секунды...</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;