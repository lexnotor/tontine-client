import { LoginForm, PageTransition } from "@/components";

const Login = () => {
    return (
        <PageTransition>
            <div className="pt-2 max-w-md mx-auto">
                <div className="p-4 rounded-t-xl h-[calc(100vh-0.5rem)] bg-white">
                    <h1 className="text-xl font-bold mb-6">Totine</h1>
                    <h2 className="text-3xl mb-2">Connectez vous ici</h2>
                    <p className="mb-6 text-neutral-500">
                        Acceder rapide et simplement à votre compte
                    </p>
                    <LoginForm />
                </div>
            </div>
        </PageTransition>
    );
};

export default Login;
