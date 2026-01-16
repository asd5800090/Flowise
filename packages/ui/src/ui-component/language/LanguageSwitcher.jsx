import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// material-ui
import { FormControl, Select, MenuItem, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

// assets
import { IconLanguage } from '@tabler/icons-react'

// styles
const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.secondary.light
        },
        '&:hover fieldset': {
            borderColor: theme.palette.secondary.main
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main
        }
    }
}))

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation()
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

    useEffect(() => {
        // 组件挂载时设置当前语言
        setCurrentLanguage(i18n.language)
    }, [i18n.language])

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value
        i18n.changeLanguage(selectedLanguage)
        setCurrentLanguage(selectedLanguage)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <IconLanguage stroke={1.5} size='1.3rem' />
            <StyledFormControl variant='outlined' size='small' sx={{ ml: 1 }}>
                <Select
                    value={currentLanguage}
                    onChange={handleLanguageChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value='en'>{t('language.english')}</MenuItem>
                    <MenuItem value='zh-CN'>{t('language.chinese')}</MenuItem>
                </Select>
            </StyledFormControl>
        </Box>
    )
}

export default LanguageSwitcher