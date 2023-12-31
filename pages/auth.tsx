"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";

import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import GenreSelectionCard from "@/components/GenreSelectionCard"; // Import the genre selection card component

import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Swal from "sweetalert2";

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
  const { data: currentUser } = useCurrentUser();
  const [updatedList, setUpdatedList] = useState<string[]>([]);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const toggleGenreSelection = useCallback(() => {
    setShowGenres((prevValue) => !prevValue);
    console.log(currentUser);
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

      Swal.fire({
        icon: "success",
        title: "Logged in Successfully !",
      });

      router.push("/profiles");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Failed to Login!",
      });
    }
  }, [email, password, router]);

  /* const register = useCallback(async () => {
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
      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      toggleGenreSelection();
      // login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, toggleGenreSelection]);

  const handleContinue = useCallback(async () => {
    if (showGenres) {
      // Perform genre selection logic here
      console.log("Selected Genres:", favoriteGenres);

      try {
        // Store user genre selection in the database
        await axios.post("/api/genre", {
          user_id: email, // Use a unique identifier for the user, such as email
          genre: favoriteGenres,
        });

        Swal.fire({
          icon: "success",
          title: "Saved your Favorite Genres Successfully !",
        });
        login();

        // Redirect or perform any other actions after genre selection
        // router.push("/profiles");
      } catch (error) {
        console.log(error);
      }
    } else {
      if (variant === "login") {
        login();
      } else {
        toggleGenreSelection();
      }
    }
  }, [
    showGenres,
    favoriteGenres,
    variant,
    login,
    toggleGenreSelection,
    router,
  ]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-2">
          <Image src="/images/logo.png" alt="logo" height={200} width={200} />
        </nav>
        <div className="flex justify-center ">
          <div className="bg-black bg-opacity-70 px-16 py-8 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
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
        {showGenres && (
          <GenreSelectionCard
            favoriteGenres={favoriteGenres}
            setFavoriteGenres={setFavoriteGenres}
            handleGenreChange={handleGenreChange}
            onContinue={handleContinue} // Update the prop name here
            login={login}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
