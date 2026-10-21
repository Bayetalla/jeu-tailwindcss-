import React from 'react';
import { VisualSchemaType } from '../../types';
import { BoxModelVisualizer } from './BoxModelVisualizer';
import { FlexboxVisualizer } from './FlexboxVisualizer';
import { GridVisualizer } from './GridVisualizer';
import { PositionVisualizer } from './PositionVisualizer';
import { ResponsiveVisualizer } from './ResponsiveVisualizer';
import { SpecificityVisualizer } from './SpecificityVisualizer';
import { AnimationVisualizer } from './AnimationVisualizer';
import { VariablesVisualizer } from './VariablesVisualizer';

interface VisualizerRendererProps {
  type: VisualSchemaType;
  caption?: string;
}

export const VisualizerRenderer: React.FC<VisualizerRendererProps> = ({ type, caption }) => {
  return (
    <div className="space-y-3">
      {type === 'box-model' && <BoxModelVisualizer />}
      {type === 'flexbox' && <FlexboxVisualizer />}
      {type === 'grid' && <GridVisualizer />}
      {type === 'positioning' && <PositionVisualizer />}
      {type === 'responsive' && <ResponsiveVisualizer />}
      {type === 'specificity' && <SpecificityVisualizer />}
      {type === 'animations' && <AnimationVisualizer />}
      {type === 'variables' && <VariablesVisualizer />}

      {caption && (
        <p className="text-xs text-slate-400 font-mono text-center pt-1 italic">
          {caption}
        </p>
      )}
    </div>
  );
};
