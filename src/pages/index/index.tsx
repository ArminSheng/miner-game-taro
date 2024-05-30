import { View } from "@tarojs/components";

import "./index.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../../data";
import { Galaxy, LeftPanel } from "../../components";

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View className="wrapper">
        <View className="scrollbar-thin scrollbar-thumb-main scrollbar-track-gray-second w-[100vw] h-[100vh] bg-[#191A29] flex overflow-x-hidden overflow-[overlay]">
          <View className="w-[580px]">
            <LeftPanel />
          </View>
          <View className="flex-1">
            <Galaxy />
          </View>
        </View>
      </View>
    </QueryClientProvider>
  );
};

export default Index;
