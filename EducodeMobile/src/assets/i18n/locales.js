import React from "react";
import en_ca_flag from "localizations/en-ca.svg";
import fr_ca_flag from "localizations/fr-ca.svg";
import IconText from "controls/IconText.react";

const en_ca_text = require("localizations/en-ca.json");
const fr_ca_text = require("localizations/fr-ca.json");

export const EN_CA = {
  locale: "en-ca",
  text  : en_ca_text,
  flag  : en_ca_flag,
  name  : "English",
};

export const FR_CA = {
  locale: "fr-ca",
  text  : fr_ca_text,
  flag  : fr_ca_flag,
  name  : "Français"
};

export const locales = {
  "en-ca": EN_CA,
  "fr-ca": FR_CA
};

export const localeSelectOptions = [
  {
    value : EN_CA.locale,
    filter: EN_CA.name,
    label : <IconText useBlank={IconText.useBlank.never} src={en_ca_flag} text={EN_CA.name} imageClass="localeFlag"/>
  }, {
    value : FR_CA.locale,
    filter: FR_CA.name,
    label : <IconText useBlank={IconText.useBlank.never} src={fr_ca_flag} text={FR_CA.name} imageClass="localeFlag"/>
  }
];