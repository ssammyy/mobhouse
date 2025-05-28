import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthSuccess: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const user = {
                id: 1,
                email: formData.email,
                name: formData.email.split('@')[0]
            };
            onAuthSuccess(user);
            setIsLoading(false);
            onClose();
        }, 1000);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const user = {
                id: 1,
                email: formData.email,
                name: formData.name
            };
            onAuthSuccess(user);
            setIsLoading(false);
            onClose();
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black border border-gray-700 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Join Mob House DJs
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                        <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                            Sign Up
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <Label htmlFor="signin-email" className="text-white">Email</Label>
                                <Input
                                    id="signin-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="signin-password" className="text-white">Password</Label>
                                <Input
                                    id="signin-password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div>
                                <Label htmlFor="signup-name" className="text-white">Full Name</Label>
                                <Input
                                    id="signup-name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="signup-email" className="text-white">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="signup-password" className="text-white">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                <div className="text-center pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400">
                        By signing up, you agree to unlimited streaming and exclusive event access
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
