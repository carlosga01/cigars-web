"use client";

import { CigarsRecord, ReviewsRecord } from "@/xata";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDebounce } from "use-debounce";
import { CreateReviewPayload } from "../api/create/route";
import { CreateCigarPayload } from "../api/cigar/route";
import colors from "@/theme/colors";
import { Rating } from "@mui/material";

export default function CreatePage() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "create";
  const reviewId = searchParams.get("reviewId") ?? "";

  const [isSaving, setIsSaving] = useState(false);

  const [record, setRecord] = useState<CreateReviewPayload>({
    reviewId: "",
    cigarId: "",
    review: "",
    rating: 5,
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

  useEffect(() => {
    if (mode === "edit") {
      const fetchData = async () => {
        const result = await fetch(`/api/review?reviewId=${reviewId}`);
        const review = (await result.json()) as { data: ReviewsRecord };
        setRecord({
          reviewId: review.data.id,
          cigarId: review.data.cigar?.id ?? "",
          rating: review.data.rating,
          review: review.data.reviewText ?? "",
        });
        setCigarSearch(review.data.cigar?.name ?? "");
        if (review.data.images) {
          setImageSrc(review.data.images[0].url ?? "");
        }
      };
      fetchData();
    }
  }, [mode, reviewId]);

  const saveEnabled = useMemo(
    () =>
      (!!record.cigarId || !!customCigarName.length) &&
      !!record.rating &&
      !!record.review &&
      (!!image || !!imageSrc),
    [record, image, customCigarName, imageSrc],
  );

  const onSave = async () => {
    if (!image && !imageSrc) return;
    setIsSaving(true);

    if (mode === "edit") {
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
          method: "PUT",
          body: JSON.stringify({
            ...record,
            cigarId,
            ...(image ? { image, imageBase64: imageSrc } : {}),
          } as CreateReviewPayload),
        });
      } else {
        await fetch("/api/create", {
          method: "PUT",
          body: JSON.stringify({
            ...record,
            ...(image ? { image, imageBase64: imageSrc } : {}),
          } as CreateReviewPayload),
        });
      }
    } else {
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
    }
    setIsSaving(false);
    router.push("/home");
    router.refresh();
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
            <Input label="Cigar name" onValueChange={setCustomCigarName} size="lg" />
          </>
        ) : (
          <>
            <Autocomplete
              label="Cigar"
              placeholder={cigarSearch ? cigarSearch : "Search for a cigar"}
              onInputChange={setCigarSearch}
              onSelectionChange={(k) =>
                setRecord((prev) => ({ ...prev, cigarId: k ? k.toString() : "" }))
              }
              size="lg"
              defaultSelectedKey={record.cigarId}
              defaultInputValue={cigarSearch}
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
          value={record.review}
          onValueChange={(review) => setRecord((prev) => ({ ...prev, review }))}
          className="text-base"
          size="lg"
        />
        <div>
          <p
            className=" text-center font-bold text-l"
            style={{
              color: colors.primaryText,
            }}
          >
            Overall rating ({record.rating})
          </p>
          <div className="flex flex-row items-center justify-evenly">
            <Button
              onPress={() => {
                const newRating = Math.max(0, record.rating - 0.5);
                setRecord((prev) => ({ ...prev, rating: newRating }));
              }}
              style={{
                color: colors.primaryText,
                backgroundColor: colors.highlight,
                width: "40px",
                height: "40px",
                minWidth: "40px",
                padding: 0,
              }}
              className="text-4xl font-bold"
            >
              -
            </Button>
            <Rating
              name="simple-controlled"
              precision={0.5}
              className="self-center mx-2"
              value={record.rating}
              defaultValue={5}
              max={5}
              onChange={(_, newValue) => {
                if (newValue) {
                  setRecord((prev) => ({ ...prev, rating: newValue }));
                }
              }}
              size="large"
            />
            <Button
              onPress={() => {
                const newRating = Math.min(5, record.rating + 0.5);
                setRecord((prev) => ({ ...prev, rating: newRating }));
              }}
              style={{
                color: colors.primaryText,
                backgroundColor: colors.highlight,
                width: "40px",
                height: "40px",
                minWidth: "40px",
                padding: 0,
              }}
              className="text-4xl font-bold"
            >
              +
            </Button>
          </div>
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
