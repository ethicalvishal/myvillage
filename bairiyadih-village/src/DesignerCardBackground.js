import React from 'react';
import RuralSVGBackground from './RuralSVGBackground';

/**
 * DesignerCardBackground: Universal premium card background for all major sections.
 * - Glassmorphism (blur, semi-transparent white)
 * - Gradient overlay
 * - Animated sheen
 * - Pattern overlay (dots/waves)
 * - RuralSVGBackground (SVG motif, section-specific)
 *
 * Props:
 * - children: Card content
 * - variant: string (for RuralSVGBackground, e.g. 'home', 'about', 'people', etc.)
 * - className: extra classes for the card container
 */
const DesignerCardBackground = ({ children, variant = 'default', className = '' }) => (
  <div className={`relative enhanced-card overflow-hidden ${className}`}>
    {/* SVG Motif (section-specific) - Only for Home */}
    {variant === 'home' && (
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-80">
        <RuralSVGBackground variant={variant} />
      </div>
    )}
    {/* Gradient Overlay */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50 via-yellow-50 to-amber-50 opacity-80" />
    {/* Glassmorphism Layer */}
    <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-xl" />
    {/* Animated Sheen */}
    <div className="absolute inset-0 -z-10 pointer-events-none animate-shimmer" style={{background: 'linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.18) 80%, transparent 100%)'}} />
    {/* REMOVE Pattern Overlay (dots + wavy line) for all except Home */}
    {/* Card Content */}
    <div className="card-content relative z-10">
      {children}
    </div>
  </div>
);

export default DesignerCardBackground; 