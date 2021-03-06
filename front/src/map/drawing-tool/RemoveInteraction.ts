import PointerInteraction from "ol/interaction/Pointer";
import {Source} from "ol/source";
import {Layer} from "ol/layer";

interface Options {
  source?: Source,
  layers?: Layer<Source>[]
}

export const RemoveInteraction = /*@__PURE__*/(function (PointerInteraction) {
  function RemoveInteraction(options: Options) {
    PointerInteraction.call(this, {
      handleDownEvent: handleDownEvent,
      handleMoveEvent: handleMoveEvent
    });

    this.source_ = options.source;
    /**
     * @type {string|undefined}
     * @private
     */
    this.cursor_ = 'pointer';

    /**
     * @type {string|undefined}
     * @private
     */
    this.previousCursor_ = undefined;

    if(options.layers) {
      /**
       * Layers enabled for removing interaction
       * Layer<Source>
       */
      this.layerFilter = (layer: Layer<Source>) => options.layers.includes(layer);
    }
  }

  if ( PointerInteraction ) RemoveInteraction.__proto__ = PointerInteraction;
  RemoveInteraction.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
  RemoveInteraction.prototype.constructor = RemoveInteraction;

  return RemoveInteraction;
}(PointerInteraction));


/**
 * @param {import("../src/ol/MapBrowserEvent.js").default} evt Map browser event.
 * @return {boolean} `true` to start the drag sequence.
 */
function handleDownEvent(evt) {
  const map = evt.map;
  const feature = map.forEachFeatureAtPixel(
    evt.pixel,
    feature => feature,
    {layerFilter: this.layerFilter}
  );
  if (feature && this.source_) {
    this.source_.removeFeature(feature);
  }
  return !!feature;
}


/**
 * @param {import("../src/ol/MapBrowserEvent.js").default} evt Event.
 */
function handleMoveEvent(evt) {
  if (this.cursor_) {
    const map = evt.map;
    const feature = map.forEachFeatureAtPixel(
      evt.pixel,
      feature => feature,
      {layerFilter: this.layerFilter}
    );
    const element = evt.map.getTargetElement();
    if (feature) {
      if (element.style.cursor != this.cursor_) {
        this.previousCursor_ = element.style.cursor;
        element.style.cursor = this.cursor_;
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
}
