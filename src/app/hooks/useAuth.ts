"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginData = {
  email: string;
  password: any;
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginUser = async ({ email, password }: LoginData) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/signinuser", {
        email,
        password,
      });

      if (response.status === 200) {
        const { username } = response.data;

        router.push("/");
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
  };
};

const useRegistration = () => {};
