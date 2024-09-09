"use client";

import { CigarsRecord } from "@/xata";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { ReviewStars } from "@/components";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useDebounce } from "use-debounce";
import { CreateReviewPayload } from "../api/create/route";
import { CreateCigarPayload } from "../api/cigar/route";
import colors from "@/theme/colors";
import { Rating } from "@mui/material";

export default function CreatePage() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);

  const [record, setRecord] = useState<CreateReviewPayload>({
    cigarId: "",
    review: "",
    rating: 0,
  });

  const [cigarSearch, setCigarSearch] = useState("");
  const [cigars, setCigars] = useState<CigarsRecord[]>([]);
  const [query] = useDebounce(cigarSearch, 750);

  const [image, setImage] = useState<File>();
  const [imageSrc, setImageSrc] = useState("");

  const [customCigar, setCustomCigar] = useState(false);
  const [customCigarName, setCustomCigarName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "/api/search?" +
          new URLSearchParams({
            query,
          }),
      );
      const cigars = (await result.json()) as { data: { records: CigarsRecord[] } };
      setCigars(cigars.data.records);
    };
    if (cigarSearch.length) {
      fetchData();
    } else {
      setCigars([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (image) {
      var reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };

      reader.readAsDataURL(image);
    }
  }, [image]);

  const saveEnabled = useMemo(
    () =>
      (!!record.cigarId || !!customCigarName.length) &&
      !!record.rating &&
      !!record.review &&
      !!image,
    [record, image, customCigarName],
  );

  const onSave = async () => {
    if (!image) return;
    setIsSaving(true);

    if (customCigar && customCigarName.length) {
      const newCigar = await fetch("/api/cigar", {
        method: "POST",
        body: JSON.stringify({
          name: customCigarName,
        } as CreateCigarPayload),
      });
      const newCigarJson = await newCigar.json();
      const cigarId = newCigarJson.data.id;

      await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          ...record,
          cigarId,
          image,
          imageBase64: imageSrc,
        } as CreateReviewPayload),
      });
    } else {
      await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          ...record,
          image,
          imageBase64: imageSrc,
        } as CreateReviewPayload),
      });
    }

    setIsSaving(false);
    router.push("/home");
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-full md:w-[600px] p-4 mb-16 gap-4">
        <div className="flex flex-row items-center justify-between w-full">
          <h1
            className="text-start font-bold text-xl"
            style={{
              color: colors.primaryText,
            }}
          >
            New Review
          </h1>
          <Button
            color="danger"
            variant="flat"
            onPress={router.back}
            style={{ color: colors.black, backgroundColor: colors.errorColor }}
          >
            Cancel
          </Button>
        </div>
        {customCigar ? (
          <>
            <Input label="Cigar name" onValueChange={setCustomCigarName} />
          </>
        ) : (
          <>
            <Autocomplete
              label="Cigar"
              placeholder="Search for a cigar"
              onInputChange={setCigarSearch}
              onSelectionChange={(k) =>
                setRecord((prev) => ({ ...prev, cigarId: k ? k.toString() : "" }))
              }
              size="lg"
            >
              {cigars.map((cigar) => {
                return <AutocompleteItem key={cigar.id}>{cigar.name}</AutocompleteItem>;
              })}
            </Autocomplete>
            <div className="flex flex-row items-center justify-center">
              <div className="italic  mr-4" style={{ color: colors.secondaryText }}>
                Don&apos;t see your cigar?
              </div>
              <Button
                color="primary"
                variant="bordered"
                onPress={() => setCustomCigar(true)}
                style={{ borderColor: colors.accentColor, color: colors.accentColor }}
              >
                Add it
              </Button>
            </div>
          </>
        )}

        {imageSrc ? (
          <div className="flex flex-row w-full justify-center items-center">
            <Image
              src={imageSrc}
              className="h-48 w-48 object-cover rounded-full"
              alt="my cigar image"
            />
            <Button
              variant="bordered"
              color="danger"
              className="ms-4"
              onPress={() => {
                setImage(undefined);
                setImageSrc("");
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center">
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
              className="hidden"
            />
            <div
              className="flex justify-center items-center h-48 w-48 rounded-full p-4 text-center text-sm"
              style={{
                backgroundColor: colors.secondaryBackground,
                color: colors.primaryText,
              }}
            >
              Upload a photo of your cigar. Center the label in the image.
            </div>
            <Button
              className="ms-4"
              onPress={() => fileInput.current?.click()}
              style={{ color: colors.black, backgroundColor: colors.accentColor }}
            >
              Upload
            </Button>
          </div>
        )}

        <Textarea
          label="Review"
          placeholder="Enter your review"
          onValueChange={(review) => setRecord((prev) => ({ ...prev, review }))}
          className="text-base"
          size="lg"
        />
        <div className="flex flex-row justify-center">
          <Rating
            name="simple-controlled"
            precision={0.5}
            className="self-center"
            value={record.rating}
            defaultValue={5}
            onChange={(_, newValue) => {
              if (newValue) {
                setRecord((prev) => ({ ...prev, rating: newValue }));
              }
            }}
            onChangeActive={(_, newValue) => {
              if (newValue) {
                setRecord((prev) => ({ ...prev, rating: newValue }));
              }
            }}
            size="large"
          />
        </div>
        <Button
          onPress={onSave}
          isLoading={isSaving}
          isDisabled={!saveEnabled}
          style={{ color: colors.black, backgroundColor: colors.accentColor }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
