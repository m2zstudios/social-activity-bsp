import { useSettings } from "../Context/SettingsContext";

const MaintenanceGate = ({ children }) => {
  const { settings } = useSettings();

  if (settings.maintenanceMode) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        🚧 Site Under Maintenance
      </div>
    );
  }

  return children;
};

export default MaintenanceGate;
