import {
  siArduino, siCplusplus, siDocker, siEspressif, siFastapi, siFfmpeg, siFlutter, siGithub, siGithubactions,
  siHuggingface, siJavascript, siLangchain, siMediapipe, siMongodb, siMqtt, siMysql, siNextdotjs, siNodedotjs,
  siNumpy, siOpenjdk, siOpencv, siPandas, siPostgresql, siPython, siPytorch, siReact, siScikitlearn, siSolidity,
  siSpring, siSpringboot, siTensorflow, siTypescript,
} from "simple-icons";

type Icon = { path: string; title: string };

export const techIcons: Record<string, Icon> = {
  arduino: siArduino, cplusplus: siCplusplus, docker: siDocker, espressif: siEspressif, fastapi: siFastapi,
  ffmpeg: siFfmpeg, flutter: siFlutter, github: siGithub, githubactions: siGithubactions, huggingface: siHuggingface,
  javascript: siJavascript, langchain: siLangchain, mediapipe: siMediapipe, mongodb: siMongodb, mqtt: siMqtt,
  mysql: siMysql, nextdotjs: siNextdotjs, nodedotjs: siNodedotjs, numpy: siNumpy, openjdk: siOpenjdk, opencv: siOpencv,
  pandas: siPandas, postgresql: siPostgresql, python: siPython, pytorch: siPytorch, react: siReact,
  scikitlearn: siScikitlearn, solidity: siSolidity, spring: siSpring, springboot: siSpringboot,
  tensorflow: siTensorflow, typescript: siTypescript,
};

/** Icons shown in the scrolling technology strip */
export const marqueeIcons = [
  "python", "pytorch", "opencv", "langchain", "huggingface", "react", "nextdotjs", "typescript", "springboot",
  "fastapi", "docker", "postgresql", "espressif", "arduino", "mqtt", "solidity", "ffmpeg", "mediapipe",
] as const;
