import { Messaging, FcmMessagePayload } from "../src/apiRequests/Messaging";

describe("Messaging", () => {
  let messaging: Messaging;
  let apiRequestMock: jest.SpyInstance;

  // Mock Auth and apiBaseUrl for Messaging constructor
  const mockAuth = {} as any;
  const mockApiBaseUrl = "http://localhost/api";

  beforeEach(() => {
    messaging = new Messaging(mockAuth, mockApiBaseUrl);
    apiRequestMock = jest.spyOn(messaging, "apiRequest").mockResolvedValue({ success: true });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should subscribe to a topic", async () => {
    const topic = "news";
    const token = "device123";
    const options = { foo: "bar" };
    await messaging.subscribeToTopic(topic, token, options);
    expect(apiRequestMock).toHaveBeenCalledWith(
      "/api/fcm/subscribe/news",
      "POST",
      { foo: "bar", token: "device123" }
    );
  });

  it("should unsubscribe from a topic", async () => {
    const topic = "news";
    const token = "device123";
    const options = { foo: "bar" };
    await messaging.unsubscribeFromTopic(topic, token, options);
    expect(apiRequestMock).toHaveBeenCalledWith(
      "/api/fcm/unsubscribe/news",
      "POST",
      { foo: "bar", token: "device123" }
    );
  });

  it("should unsubscribe from all topics", async () => {
    const token = "device123";
    await messaging.unsubscribeFromAllTopics(token);
    expect(apiRequestMock).toHaveBeenCalledWith(
      "/api/fcm/unsubscribe/all",
      "POST",
      { token: "device123" }
    );
  });

  it("should send a message to a topic", async () => {
    const topic = "news";
    const payload: FcmMessagePayload = { message: "Hello" };
    await messaging.sendMessageToTopic(topic, payload);
    expect(apiRequestMock).toHaveBeenCalledWith(
      "/api/fcm/send/topic/news",
      "POST",
      payload
    );
  });

  it("should send a message to a device", async () => {
    const token = "device123";
    const payload: FcmMessagePayload = { message: "Hi device" };
    await messaging.sendMessageToDevice(token, payload);
    expect(apiRequestMock).toHaveBeenCalledWith(
      "/api/fcm/send/to/device123",
      "POST",
      payload
    );
  });
});
