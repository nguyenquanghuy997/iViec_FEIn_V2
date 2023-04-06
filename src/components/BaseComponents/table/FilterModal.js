import DrawerEditForm from "@/components/drawer-edit-form";

export default function FilterModal({
  ...props
}) {
  return (
    <DrawerEditForm
      title="Bộ lọc"
      okText="Áp dụng"
      cancelText="Bỏ lọc"
      statusField="auto"
      activeText="Tự động"
      inActiveText="Tự động"
      {...props}
    >

    </DrawerEditForm>
  )
}