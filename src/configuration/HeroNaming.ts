export enum HeroNames {
  "Kaja",
  "Ming",
  "Afina",
  "Bella_And_Sam",
  "Atilla",
  "Malxaz",
  "Amanta",
  "Rocky",
  "Alex",
  "Misoko",
  "Diana",
  "Omar",
  "Lucius",
  "Manor",
  "San",
  "Ninos",
  "Argon",
  "Elena",
}

type HeroName = keyof typeof HeroNames

export default HeroName
