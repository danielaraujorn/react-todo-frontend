import { useIntl } from 'react-intl'

export const useFormatMessage = () => {
  const { formatMessage } = useIntl()
  return (id: string, rest?: object) => formatMessage({ id, ...rest })
}
