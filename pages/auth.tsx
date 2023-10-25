/*"use client";
import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";
import axios from "axios";
import Checkbox from "@/components/Checkbox";

import { getSession, signIn } from "next-auth/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

 

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/profiles");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);
 


  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full flex items-center bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" height={150} width={150} />
          <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold capitalize">
              {variant === "login" ? "Sign In" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => setUsername(e.target.value)}
                  id="username"
                  type="username"
                  value={username}
                />
              )}

              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
    
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Sign In" : "Sign Up"}
            </button>

            <p className="text-neutral-500 capitalize text-sm mt-12">
              {variant === "login"
                ? "First time using Netflix ?"
                : "Already have an account ?"}
              <span
                onClick={toggleVariant}
                className="text-white mt-1 ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? " Create an account" : "Sign In"}
              </span>
            </p>
          </div>
        </div>
        </nav>
        
      </div>
    </div>
  );
};
export default Auth;*/
import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";

import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import GenreSelectionCard from "@/components/GenreSelectionCard"; // Import the genre selection card component
import submitGenres from "@/hooks/useGenre"; 

import { getSession } from "next-auth/react";
import { NextPageContext } from "next";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [showGenres, setShowGenres] = useState(false);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const toggleGenreSelection = useCallback(() => {
    setShowGenres((prevValue) => !prevValue);
  }, []);

  const handleGenreChange = useCallback((genre: string) => {
    setFavoriteGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/profiles");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  /*const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      toggleGenreSelection();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, toggleGenreSelection]);*/
  
  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        email,
        username,
        password,
      });
  
      const { user_id } = response.data; // Retrieve the user_id from the response
  
      toggleGenreSelection();
  
      return user_id; // Return the user_id
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, toggleGenreSelection]);
  

  const handleSubmit = useCallback(async () => {
    if (showGenres) {
      // Perform genre selection logic here
      console.log("Selected Genres:", favoriteGenres);
      // Redirect or perform any other actions after genre selection
      router.push("/profiles");
    } else {
      if (variant === "login") {
        login();
      } else {
        toggleGenreSelection();
      }
    }
  }, [showGenres, favoriteGenres, variant, login, toggleGenreSelection, router]);

  /*const handleContinue = async () => {
    try {
      await register();
    } catch (error) {
      console.log(error);
    }
  };*/

  const handleContinue = async () => {
    try {
      const user_id = await register(); // Obtain the user_id
  
      if (user_id) {
        const genreData = {
          user_id,
          genres: favoriteGenres,
        };
  
        await submitGenres(genreData);
  
        router.push("/profiles");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" height={200} width={200} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold capitalize">
              {variant === "login" ? "Sign In" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  id="username"
                  type="username"
                  value={username}
                />
              )}

              <Input
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {showGenres ? "Continue" : variant === "login" ? "Sign In" : "Sign Up"}
            </button>

            <p className="text-neutral-500 capitalize text-sm mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white mt-1 ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? " Create an account" : "Sign In"}
              </span>
            </p>
          </div>
        </div>
        {showGenres && (
        <GenreSelectionCard
          favoriteGenres={favoriteGenres}
          handleGenreChange={handleGenreChange}
          onContinue={handleContinue} // Update the prop name here
        />
      )}
      </div>
    </div>
  );
};

export default Auth;
