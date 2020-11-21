
export const colors = [
    {value: "red", label: "Red"},
    {value: "blue", label: "Blue"},
    {value: "green", label: "Green"},
    {value: "white", label: "White"},
    {value: "hotpink", label: "Hotpink"},
];

export function fetchMockColors() {
    return new Promise((resolve) => {
        setTimeout(resolve(colors), 3000);
    });
}
