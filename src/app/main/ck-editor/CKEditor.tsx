import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import FormCKEditor from 'app/shared-components/form-fields/FormCKEditor';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

export interface IFormField {
  selectbox: string | null;
  datepicker: Date | null;
  numeric: number;
  checkbox: boolean;
  textfield: string;
  ckEditorValue: string;
}

function CKEditorPage() {
  const { t } = useTranslation('');
  const { control, handleSubmit } = useForm<IFormField>({
    defaultValues: {
      ckEditorValue: '<p>hello</p>',
    },
  });
  const onsubmit = (data: IFormField) => {
    console.log(data);
  };

  return (
    <>
      <Root
        header={
          <div className="p-24">
            <h4>{t('TITLE')}</h4>
          </div>
        }
        content={
          <div className="p-24">
            <form onSubmit={handleSubmit(onsubmit)}>
              <FormCKEditor
                control={control}
                name="ckEditorValue"
                rules={{
                  required: true,
                }}
              />
              <Button type="submit" variant="contained">
                ثبت
              </Button>
            </form>
          </div>
        }
        scroll="content"
      />
    </>
  );
}

export default CKEditorPage;
