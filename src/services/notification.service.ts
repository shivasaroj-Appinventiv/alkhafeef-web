import { api } from "@/lib/api/api";
import { NOTIFICATION_ENDPOINTS } from "@/lib/api/endpoints";
import { SaveNotificationSettingsPayload } from "@/types/notification";

export const notificationService = {
    saveNotificationSettings(payload: SaveNotificationSettingsPayload) {
        return api.put(NOTIFICATION_ENDPOINTS.SAVE_NOTIFICATION_SETTINGS, payload)
    }
}