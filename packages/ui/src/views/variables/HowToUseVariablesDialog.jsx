import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { CodeEditor } from '@/ui-component/editor/CodeEditor'

// i18n
import { useTranslation } from 'react-i18next'

const HowToUseVariablesDialog = ({ show, onCancel }) => {
    const portalElement = document.getElementById('portal')
    const { t } = useTranslation()
    
    const overrideConfig = `{
        overrideConfig: {
            vars: {
                "${t('variables.exampleVar')}": "${t('variables.exampleVal')}",
                "${t('variables.exampleVar2')}": "${t('variables.exampleVal2')}"
            }
        }
    }`

    const component = show ? (
        <Dialog
            onClose={onCancel}
            open={show}
            fullWidth
            maxWidth='sm'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {t('variables.howToUse')}
            </DialogTitle>
            <DialogContent>
                <p style={{ marginBottom: '10px' }}>
                    {t('variables.howToUseIntro1')}
                </p>
                <CodeEditor
                    disabled={true}
                    value={`$vars.<variable-name>`}
                    height={'50px'}
                    theme={'dark'}
                    lang={'js'}
                    basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
                />
                <p style={{ marginBottom: '10px' }}>
                    {t('variables.howToUseIntro2')}
                </p>
                <CodeEditor
                    disabled={true}
                    value={`You are a {{$vars.personality}} AI assistant`}
                    height={'50px'}
                    theme={'dark'}
                    lang={'js'}
                    basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
                />
                <p style={{ marginBottom: '10px' }}>
                    {t('variables.howToUseIntro3')}
                </p>
                <p style={{ marginBottom: '10px' }}>
                    {t('variables.howToUseIntro4')}
                </p>
                <CodeEditor
                    disabled={true}
                    value={overrideConfig}
                    height={'170px'}
                    theme={'dark'}
                    lang={'js'}
                    basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
                />
                <p dangerouslySetInnerHTML={{ __html: t('variables.howToUseIntro5') }} />
            </DialogContent>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

HowToUseVariablesDialog.propTypes = {
    show: PropTypes.bool,
    onCancel: PropTypes.func
}

export default HowToUseVariablesDialog