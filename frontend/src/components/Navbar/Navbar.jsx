import LeftNavigation from "./LeftNavigation";
import RightNavigation from "./RightNavigation";
import "../../styles/Navbar/Navbar.css";

export default function Navbar() {
    return (
        <div className="navbar">
            <LeftNavigation />
            <RightNavigation />
        </div>
    );
}
