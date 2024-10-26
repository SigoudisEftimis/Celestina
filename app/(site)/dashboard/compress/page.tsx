import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import Compress from "@/components/Compress";

const DashboardCompress = () => {
  return (
    <DefaultLayout>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/compress">Compress</Breadcrumb.Item>
      </Breadcrumb>
      <Compress />
    </DefaultLayout>
  );
};

export default DashboardCompress;
