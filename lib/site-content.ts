export const DONATE_URL =
  "https://hcb.hackclub.com/donations/start/openbyte-non-profit";
export const CLASS_INQUIRY_URL =
  "mailto:team@openbyte-np.org?subject=OpenByte%20Arduino%20Class%20Inquiry";
export const DEVICE_FORM_URL =
  "https://docs.google.com/forms/d/1ssA5nRFnhq44thGzA4qyUXg45BCEITjNPce8BsVD-ac/viewform";
export const POSITIONS_URL = "https://forms.gle/ZRpKRfmobkuyH1Ne6";
export const TRIBUNE_URL =
  "https://www.bulldogtribune.com/feature/2026/10/09/openbyte-opens-technological-pathways/#";
export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
export const LESSONS = [
  {
    id: "lesson-circuits",
    date: "October 11, 2026",
    iso: "2026-10-11",
    title: "Electricity and circuits",
    description:
      "Explore current and resistance, and assemble an LED circuit using electronic components.",
  },
  {
    id: "lesson-blink",
    date: "October 18, 2026",
    iso: "2026-10-18",
    title: "Arduino IDE and blinking LEDs",
    description:
      "Write a simple Arduino program to blink an LED using an LED, resistor, and microcontroller.",
  },
];
export const BLINK_CODE = `// Your first blinking LED.
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}`;
