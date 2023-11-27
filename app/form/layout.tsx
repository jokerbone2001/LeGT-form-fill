// layout.tsx
import React, { ReactNode } from 'react';
import './style.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            {/* Add your layout logic here */}
            {children}
        </div>
    );
};

export default Layout;