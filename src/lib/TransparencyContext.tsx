"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export type TransparencyCondition = "A" | "B" | "C";

const STORAGE_KEY = "archaion_condition";

const TransparencyContext = createContext<TransparencyCondition>("A");

export function useTransparency(): TransparencyCondition {
  return useContext(TransparencyContext);
}

export function getTransparencyLabel(
  condition: TransparencyCondition,
): string | null {
  if (condition === "B") return "This content has been generated using AI.";
  if (condition === "C")
    return "This content has been generated using AI. The model used has been trained on verified and reliable sources of information.";
  return null;
}

function isValidCondition(value: string | null): value is TransparencyCondition {
  return value === "A" || value === "B" || value === "C";
}

function TransparencyReader({
  onCondition,
}: {
  onCondition: (c: TransparencyCondition) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("t");
    if (isValidCondition(param)) {
      localStorage.setItem(STORAGE_KEY, param);
      onCondition(param);
    }
  }, [searchParams, onCondition]);

  return null;
}

export function TransparencyProvider({ children }: { children: ReactNode }) {
  const [condition, setCondition] = useState<TransparencyCondition>("A");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isValidCondition(stored)) {
      setCondition(stored);
    }
  }, []);

  const handleCondition = useCallback((c: TransparencyCondition) => {
    setCondition(c);
  }, []);

  return (
    <TransparencyContext.Provider value={condition}>
      <Suspense>
        <TransparencyReader onCondition={handleCondition} />
      </Suspense>
      {children}
    </TransparencyContext.Provider>
  );
}
