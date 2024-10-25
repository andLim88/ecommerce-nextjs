"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();


    console.log({ email, password });

 
    router.push('/product');  
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="p-4 w-full max-w-md shadow-2xl border-black">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              value={email} 
              className="shadow-2xl border-black"
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              value={password} 
              className="shadow-2xl border-black"
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <div>
            <Link href={'/auth/register'} className="hover:text-blue-500"> Dont have account? register now</Link>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}
