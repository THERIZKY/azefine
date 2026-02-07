import React from 'react'
import Galaxy from '../template/background/galaxy/Galaxy'
import { useTheme } from 'next-themes';

const GalaxyBackground = () => {
    const { resolvedTheme } = useTheme();

    if (resolvedTheme !== "dark") return null;

    return (
        // With custom prop values
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <Galaxy
                mouseRepulsion
                mouseInteraction={false}
                density={1}
                glowIntensity={0.3}
                saturation={0}
                hueShift={140}
                twinkleIntensity={0.3}
                rotationSpeed={0.1}
                repulsionStrength={2}
                autoCenterRepulsion={0}
                starSpeed={0.5}
                speed={1}
            />
        </div>
    )
}

export default GalaxyBackground