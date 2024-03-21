---
title: Snapback Zoom
description: An ideal component for preview handling
outline: deep
---

# SnapbackZoom
An ideal component for preview handling, as its name suggests it returns to its original position after the pinch gesture ends, you can see this feature being implemented in Telegram's messages containing images and/or videos or Instragram's posts.

The next video footage is taken from the [Example app](https://github.com/Glazzes/react-native-zoom-toolkit/tree/main/example)

<div style="width: 100%; display: flex; justify-content: center; align-items: center">
  <video src="../assets/snapbackzoom.mp4" controls />
</div>

## How to use
Its usage is pretty straight forward, import SnapBackZoom component from `react-native-zoom-toolkit` and wrap a component of your choice with it.

::: tip Tip
Do not use `position: "absolute"` in the wrapped component by `SnapbackZoom` as it messes up with pinch gesture's measurement, wrap `SnapBackZoom` within a absolute positioned view if you need so.
:::

```jsx
import { SnapBackZoom } from "react-native-zoom-toolkit"

// Simple use case
<SnapBackZoom>
  <Image // <= This could be an Expo image or a Video
    source={{ uri: IMAGE }}
    style={{ width: 200, height: 200 }}
    resizeMethod={"scale"} // <= Very important for images in Android do not forget it
    resizeMode={"cover"}/>
</SnapBackZoom>

// Complex use case
<SnapBackZoom
  hitSlop={{ vertical: 50, horizontal: 50 }}
  timingConfig={{ duration: 150, easing: Easing.linear }}
  onTap={(e) => console.log(e)}
  onDoubleTap={(e) => console.log(e)}
  onPinchStart={(e) => console.log(e)}
  onPinchEnd={(e) => console.log(e)}
  onGestureActive={(e) => {
    'worklet';
     console.log(e);
  }}
  onGestureEnd={() => console.log('animation finished!')}>
    <Image // <= This could be an Expo image or a Video
      source={{ uri: IMAGE }}
      style={{ width: 200, height: 200 }}
      resizeMethod={"scale"} // <= Very important for images in Android do not forget it
      resizeMode={"cover"}/>
</SnapBackZoom>
```

## Properties
All properties for this component are optional.

### hitslop
| Type | Default | Additional Info |
|------|---------|-----------------|
| `object` | `undefined` | see [HitSlop](https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/common-gh/#hitslop) |

Increase (Android only) or decrease the gesture detection area around your component in all directions by a given amount in pixels, useful when dealing with small components.

### timingConfig 
| Type | Default | Additional Info |
|------|---------|-----------------|
| `object` | `undefined` | see [TimingConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming/#config-) |

Custom [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)'s timing configuration used to snap back to the original position.

::: tip Tip
Be realistic with the timing configuration you use as you will not be able to resume the gesture once the snapback animation has started.
:::

### resizeConfig
| Type | Default | Additional info |
|------|---------|-----------------|
| `ResizeConfig` | `undefined` | see [notes](#notes) |

Dynamically recalculates `SnapBackZoom` component's `width` and `height` style properties to align with a given `aspect ratio` based on a `scale` value as the gesture scale increases.

### gesturesEnabled
| Type | Default |
|------|---------|
| `boolean` | `true` |

Enables or disable gestures, when gestures are disabled your component can detect pointer events again.

### onTap
| Type | Default | Additional Info |
|------|---------|-----------------|
| `function` | `undefined` | see [tap gesture event data](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/tap-gesture#event-data) |

Callback triggered when a single tap is made, receives a tap gesture event as its only argument.

### onDoubleTap
| Type | Default | Additional Info |
|------|---------|-----------------|
| `function` | `undefined` | see [tap gesture event data](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/tap-gesture#event-data) |

Callback triggered when a double tap is made, receives a tap gesture event as its only argument.

### onPinchStart
| Type | Default | Additional Info |
|------|---------|-----------------|
| `function` | `undefined` | see [pinch gesture event data](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/pinch-gesture#event-data) |

callback triggered when the pinch gesture starts, receives a pinch gesture event as its only argument.

### onPinchEnd
| Type | Default | Additional Info |
|------|---------|-----------------|
| `function` | `undefined` | see [pinch gesture event data](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/pinch-gesture#event-data) |

Callback triggered as soon as the user lifts their fingers off the screen after pinching, receives tap gesture event as its only argument.

### onGestureActive
| Type | Default | Additional Info |
|------|---------|-----------------|
| `worklet function` | `undefined` | see [worklets](https://docs.swmansion.com/react-native-reanimated/docs/2.x/fundamentals/worklets/) |

Callback triggered from the moment pinch gesture starts until the snap back animation finishes, 
receives an object of type [SnapbackZoomState](#snapbackzoomstate) as its only argument.

Ideal if you need to mirror the current state of the gesture to some other component.

### onGestureEnd
| Type | Default |
|------|---------|
| `function` | `undefined` |

Callback triggered once the snap back animation has finished.

## Notes
### On resizeConfig Property
Imagine you've got a lot of images you want to display as tiles of 200x200 pixel size, for many of those images the aspect ratio has been compromised, assume one of those images is 1920x1080 pixel size and you would like this image to resize in such a way the aspect ratio is no longer compromised when the image has been scaled two times by the pinch gesture, your object would look like this one.

```javascript
{
  size: { width: 200, height: 200 }, // size of your tile
  aspectRatio: 1920 / 1080, // aspect ratio based on the size of your image/video
  scale: 2 // at which scale the aspect ratio is no longer compromised
}
```

::: tip Important
`SnapbackZoom` resizes its own dimensions not your component's ones, remember to use `{width: '100%', height: '100%'}` for images and videos so they cover the entire area of `SnapBackZoom` as it resizes.
:::

At a scale of one your image is a tile of 200x200 pixel size, in other words a square, but at a scale two it resizes to 340x200 pixel size becoming a rectangle matching with the image's aspect ratio.

## Type Definitions
### ResizeConfig

| Property | type | description |
|----------|------|-------------|
| size     | `{width: number; height: number;}` | Fields specify the width and height of your component. |
| aspectRatio | `number` | Aspect ratio of your image/video/component. |
| scale       | `number` | At which scale your component will be fully resized to meet the aspect ratio. |

### SnapbackZoomState

| Name | Type | Description |
|------|---------|----------|
| `x`  | `number` | Position in the x axis starting from the top left corner of the screen |
| `y`  | `number` | Position in the y axis starting from the top left corner of the screen |
| `width` | `number` | Inital width measurement of your component |
| `height` | `number` | Inital height measurement of your component |
| `resizedWidth` | `number \| undefined` | Current width measurement of your component, if `resizeConfig` property is `undefined`, this value will be `undefined` too |
| `resizedWidth` | `number \| undefined` | Current height measurement of your component, if `resizeConfig` property is `undefined`, this value will be `undefined` too |
| `translateX` | `number` | Current translateX transformation value |
| `translateY` | `number` | Current translateY transformation value |
| `scale` | `number` | Current scale transformation value |