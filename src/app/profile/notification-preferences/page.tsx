"use client";

import ProfileListSkeleton from "@/components/profile/ProfileListSkeleton";
import ProfilePageShell from "@/components/profile/ProfilePageShell";
import { authService } from "@/services/auth.service";
import { notificationService } from "@/services/notification.service";
import { toastService } from "@/utils/toast.service";
import { useEffect, useState } from "react";

export default function NotificationPreferencesPage() {
  const [settings, setSettings] = useState({
    isLoyaltyProgram: true,
    isMuteNotify: false,
    isOrderPurchase: true,
    isPromoOffers: false,
    isPushNotify: true
  });
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const preferences = [
    {
      key: "isPushNotify",
      title: "Push Notification",
      description:
        "Receive updates about orders and purchase, promos & offers",
    },
    {
      key: "isMuteNotify",
      title: "Mute Notification",
      description: "Mute or Unmute all notifications",
    },
    {
      key: "isOrderPurchase",
      title: "Orders & Purchase",
      description:
        "Receive updates related to your order status, delivery and cancellations.",
    },
    {
      key: "isPromoOffers",
      title: "Promos & offers",
      description:
        "Receive updates about coupons, promotions and money saving offers",
    },
  ] as const;

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setDisableSubmit(false);
  };

  const getNotificationSettings = async () => {
    try {
      setIsDataLoading(true);
      const { data } = await authService.getUserProfile();
      console.log(data);

      if (data.statusCode == 200) {
        setSettings(
          data.data.notificationSetting
        )
        setIsDataLoading(false);

      }
    } catch (error) {
      setIsDataLoading(false);

    }
  }

  useEffect(() => {
    getNotificationSettings();
  }, [])

  const handleSubmit = async () => {
    console.log(settings)
    try {
      setIsLoading(true);
      const { data } = await notificationService.saveNotificationSettings(settings);
      if (data.statusCode == 200) {
        toastService.showToast(data.message, "success");
        setIsLoading(false);
      }
      setDisableSubmit(true);
    } catch (error) {
      setIsLoading(false);

    }
  }
  return (


    <ProfilePageShell
      title="Notification Preferences"
      description="You can choose to control the alerts/notifications you receive for
            different purposes in Al Khafeef."
    >
      {/* Cards */}

      {
        isDataLoading ? <ProfileListSkeleton /> :

          <div className="space-y-4 p-6">
            {
              preferences.map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white px-6 py-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                  {/* Switch */}
                  <button
                    onClick={() => toggle(item.key)}
                    className={`relative h-8 w-14 rounded-full transition-all duration-300 ${settings[item.key]
                      ? "bg-orange-500"
                      : "bg-gray-200"
                      } cursor-pointer`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-300 ${settings[item.key]
                        ? "left-7"
                        : "left-1"
                        } cursor-pointer`}
                    />
                  </button>

                </div>

              ))
            }


            <div className="flex justify-center pt-6">
              <button className={`rounded-full  px-12 py-4 text-lg font-semibold text-white transition ${disableSubmit || isLoading ? " bg-gray-400 cursor-not-allowed" : " cursor-pointer bg-orange-500"}`}

                onClick={handleSubmit}
              >
                {
                  isLoading ? "..." : "Save Changes"
                }

              </button>
            </div>
          </div>
      }


    </ProfilePageShell>
  );
}
