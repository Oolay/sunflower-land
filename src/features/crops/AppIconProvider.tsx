/**
 * A wrapper that provides crops favicon harvestable items management
 */

import React, { useContext, useState, useEffect } from "react";
import Tinycon from "tinycon";
import { useActor } from "@xstate/react";
import { CROPS } from "features/game/types/crops";
import { Context } from "features/game/GameProvider";
import { FieldItem } from "features/game/types/game";
import { getTimeLeft } from "lib/utils/time";

interface AppIconContext {
  updateHarvestable: () => void;
}

export const AppIconContext = React.createContext<AppIconContext>(
  {} as AppIconContext
);

export const AppIconProvider: React.FC = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);

  const updateHarvestable = (op: "plus" | "minus"): void => {
    setCounter((prevCounter) => prevCounter + (op === "plus" ? 1 : -1));
  };

  // apply force update
  useEffect(() => {
    Tinycon.setOptions({ fallback: "force" });
  }, []);

  // need to be in useEffect
  useEffect(() => {
    Tinycon.setBubble(counter);
  }, [counter]);

  return (
    <AppIconContext.Provider value={{ updateHarvestable }}>
      {children}
    </AppIconContext.Provider>
  );
};
