import Switch from "../switch/Switch.jsx";

export default function ToggleSwitch() {
    const handleSwitchChange = (checked: boolean) => {
        console.log("Switch is now:", checked ? "ON" : "OFF");
    };

    return (
        <Switch
            label="Default"
            defaultChecked={true}
            onChange={handleSwitchChange}
        />
    )
}
