import Particles from '@/components/template/background/particles/Particles';

const ParticlesBackground = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <Particles
                particleColors={["#14ff6e"]}
                particleCount={1000}
                particleSpread={10}
                speed={0.4}
                particleBaseSize={100}
                moveParticlesOnHover={false}
                alphaParticles={false}
                disableRotation
                pixelRatio={1}
            />
        </div>
    )
}

export default ParticlesBackground