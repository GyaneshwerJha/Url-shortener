import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/Error";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { getClicksForUrls } from "@/db/apiClicks";
import LinkedCard from "@/components/LinkedCard";
import CreateLink from "@/components/CreateLink";

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, [user?.id]);

  useEffect(() => {
    if (urls?.length) {
      fnClicks(urls.map((url) => url.id));
    }
  }, [urls]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buttonStyle = {
    backgroundColor: isHovered ? "rgb(121, 213, 32)" : "rgb(101, 193, 12)", // lighter shade on hover
    color: "black",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  };

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadClicks) && (
        <BarLoader width={"100%"} color="rgb(101, 193, 12)" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1
          style={{ color: "rgb(101, 193, 12)", fontSize: "1.7rem" }}
          className="font-extrabold"
        >
          My Links
        </h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkedCard key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default Dashboard;
