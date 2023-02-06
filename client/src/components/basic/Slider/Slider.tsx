import classNames from "classnames"
import React, {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md"
import "./Slider.scss"

export interface SliderRef {
  slideTo: (index: number) => void
}

const Slider: React.FC<{
  data: JSX.Element[]
  defaultIndex?: number
  className?: string
  width?: string
  height?: string
  autoplay?: boolean
  innerRef?: RefObject<SliderRef>
  autoplaySpeed?: number
  onChange?: (index: number) => void
  arrows?: [left: JSX.Element, right: JSX.Element]
}> = ({
  data,
  className,
  autoplay,
  autoplaySpeed,
  width,
  height,
  arrows,
  defaultIndex,
  onChange,
  innerRef,
}) => {
  const [list, setList] = useState(data)
  const [index, setIndex] = useState(defaultIndex || 0)

  const _width = useMemo(() => {
    return width || "300px"
  }, [width])

  const _height = useMemo(() => {
    return height || "200px"
  }, [height])

  function slideTo(index: number) {
    setIndex(index)
    onChange?.(index)
  }

  useEffect(() => {
    if (innerRef)
      // @ts-ignore
      innerRef.current = {
        slideTo,
      }
  }, [])

  return (
    <div
      style={{ width: _width, height: _height }}
      className={classNames("slider", { [className]: className })}
    >
      <div
        className="slider-arrow-container"
        onClick={() => slideTo(index === 0 ? data.length - 1 : index - 1)}
      >
        {arrows?.[0] || (
          <MdOutlineArrowBackIosNew
            className="slider-arrow clickable scale-hover"
            style={{ fontSize: `calc(${_height} / 10)` }}
          />
        )}
      </div>

      {list[index]}
      <div
        className="slider-arrow-container"
        onClick={() => slideTo(index === data.length - 1 ? 0 : index + 1)}
      >
        {arrows?.[1] || (
          <MdOutlineArrowForwardIos
            className="slider-arrow clickable scale-hover"
            style={{ fontSize: `calc(${_height} / 10)` }}
          />
        )}
      </div>
    </div>
  )
}

export default Slider
