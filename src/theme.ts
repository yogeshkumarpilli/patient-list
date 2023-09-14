import { defineStyleConfig, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const inputStyle = defineStyleConfig({
  defaultProps: {
    variant: 'filled',
  }
})

export const theme = extendTheme({
  components: {
    Input: inputStyle,
    Select: inputStyle,
  },
}, withDefaultColorScheme({ colorScheme: 'messenger' }))
