import {  ClothesShape,
  EarringsShape,
  EarShape,
  EyebrowsShape,
  EyesShape,
  FaceShape,
  MouthShape,
  NoseShape,
  TopsShape,
} from "./shapeEnum";

import { AvatarOption, NONE } from "./shapeBaseTypes";

// -----------------------------------------------
// 层级index
export const AVATAR_Index: Readonly<{}> = {
  'face': 1,
  'eyes': 2,
  'nose': 3,
  'eyebrows': 4,
  'tops': 5,
  'glasses': 6,
  'mouth': 7,
  'ear': 8,
  'earrings': 9,
  'beard': 10,
  'clothes': 11,
}

// 渲染各部位可选属性
export const avatars : Readonly<AvatarOption[]>  = [
{
    // wrapperShape: 'squircle',
    // background: {
    //   color: 'linear-gradient(62deg, #8EC5FC, #E0C3FC)',
    // },
    widgets: {
      face: {
        shape: FaceShape.Base,
      },
      tops: {
        shape: TopsShape.Pixie,
        fillColor: '#d2eff3',
      },
      ear: {
        shape: EarShape.Attached,
      },
      earrings: {
        shape: EarringsShape.Stud,
      },
      eyebrows: {
        shape: EyebrowsShape.Up,
      },
      eyes: {
        shape: EyesShape.Eyeshadow,
      },
      nose: {
        shape: NoseShape.Pointed,
      },
      glasses: {
        shape: NONE,
      },
      mouth: {
        shape: MouthShape.Laughing,
      },
      beard: {
        shape: NONE,
      },
      clothes: {
        shape: ClothesShape.Crew,
        fillColor: '#e0ddff',
      },
    },
  },
  {
    // wrapperShape: 'squircle',
    // background: {
    //   color: '#fd6f5d',
    // },
    widgets: {
      face: {
        shape: FaceShape.Base,
      },
      tops: {
        shape: TopsShape.Clean,
      },
      ear: {
        shape: EarShape.Attached,
      },
      earrings: {
        shape: NONE,
      },
      eyebrows: {
        shape: EyebrowsShape.Eyelashesdown,
      },
      eyes: {
        shape: EyesShape.Round,
      },
      nose: {
        shape: NoseShape.Round,
      },
      glasses: {
        shape: NONE,
      },
      mouth: {
        shape: MouthShape.Surprised,
      },
      beard: {
        shape: NONE,
      },
      clothes: {
        shape: ClothesShape.Crew,
        fillColor: '#f4d150',
      },
    },
  },
]