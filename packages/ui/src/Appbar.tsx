import React from 'react';
import { Button } from "./Button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar: React.FC<AppbarProps> = ({
    user,
    onSignin,
    onSignout
}) => {
    return (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-white">EzPay</div>
                <div>
                    <Button 
                        onClick={user ? onSignout : onSignin}
                        className="bg-white text-purple-600 hover:bg-purple-100"
                    >
                        {user ? "Logout" : "Login"}
                    </Button>
                </div>
            </div>
        </nav>
    );
};