import React, { use, useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

export default function Home() {
    const { user, logout, loadingUser } = useAuth();    
    
    if (loadingUser) {
        return <div className="min-h-screen flex items-center justify-center">
            CHARGEMENT 
            </div>;
    }else {
  return (
        <div className="min-h-screen p-8 text-center ">
            {user ? (
                <div>
                    <h1 className="text-4xl font-bold mb-4">Bienvenue, {user.email}!</h1>
                    <h2 className="text-2xl mb-6">Role: {user.role}</h2>
                    <Link to="/__superadmin/dashboard" className="text-blue-500 underline">
                        Aller au tableau de bord
                    </Link>
                </div>
            ) : (
                <div>
                    <h1 className="text-4xl font-bold mb-4">Pas connecté</h1>
                    <Link to="/__superadmin/login" className="text-blue-500 underline">
                        Se connecter
                    </Link>
                </div>
            )}
        </div>
    );
    }
  
}