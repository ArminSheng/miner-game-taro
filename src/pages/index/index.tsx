import React, { useCallback } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import logo from "./hook.png";

import "./index.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../../data";
import { Galaxy, LeftPanel } from "../../components";

const Index = () => {
  const { setTitle } = useNavigationBar({ title: "Taro Hooks" });
  const { show } = useToast({ mask: true });

  return (
    <QueryClientProvider client={queryClient}>
      <View className="wrapper">
        <div className="scrollbar-thin scrollbar-thumb-main scrollbar-track-gray-second w-[100vw] h-[100vh] bg-[#191A29] flex overflow-x-hidden overflow-[overlay]">
          <div className="w-[580px]">
            <LeftPanel />
          </div>
          <div className="flex-1">
            <Galaxy />
          </div>
        </div>
      </View>
    </QueryClientProvider>
  );
};

export default Index;
