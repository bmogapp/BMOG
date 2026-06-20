import { Tabs, TabList, TabSlot, TabTrigger } from 'expo-router/ui';

import { MainTabBar, TabBarButton } from '@/components/brand/main-tab-bar';

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <MainTabBar>
          <TabTrigger name="index" href="/" asChild>
            <TabBarButton icon="house" label="首頁" />
          </TabTrigger>
          <TabTrigger name="courses" href="/courses" asChild>
            <TabBarButton icon="graduation-cap" label="課程" />
          </TabTrigger>
          <TabTrigger name="calendar" href="/calendar" asChild>
            <TabBarButton icon="calendar-days" label="行事曆" />
          </TabTrigger>
          <TabTrigger name="venues" href="/venues" asChild>
            <TabBarButton icon="map-pinned" label="場地" />
          </TabTrigger>
          <TabTrigger name="community" href="/community" asChild>
            <TabBarButton icon="messages-square" label="社群" />
          </TabTrigger>
        </MainTabBar>
      </TabList>
    </Tabs>
  );
}
