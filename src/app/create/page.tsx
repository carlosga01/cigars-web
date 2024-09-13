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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";

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
    rating: 2.5,
  });

  const [cigarSearch, setCigarSearch] = useState("");
  const [cigars, setCigars] = useState<CigarsRecord[]>([]);
  const [query] = useDebounce(cigarSearch, 750);

  const [image, setImage] = useState<File>();
  const [imageSrc, setImageSrc] = useState("");

  const [customCigar, setCustomCigar] = useState(false);
  const [customCigarName, setCustomCigarName] = useState("");

  const [isFetchingCigars, setIsFetchingCigars] = useState(false);

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
      setIsFetchingCigars(false);
    };
    if (cigarSearch.length) {
      fetchData();
    } else {
      setCigars([]);
      setIsFetchingCigars(false);
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
          price: review.data.price,
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
    <div
      className="flex flex-col justify-center p-3 w-full md:w-[600px]"
      style={{
        backgroundColor: colors.black,
      }}
    >
      <div className="flex flex-row items-center justify-between w-full mb-2">
        <h1
          className="text-start font-bold text-xl"
          style={{
            color: colors.primaryText,
          }}
        >
          {mode === "edit" ? "Edit" : "New"} Review
        </h1>
        <Button color="danger" variant="solid" onPress={router.back}>
          Cancel
        </Button>
      </div>
      <div className="flex flex-col justify-center gap-6">
        {customCigar ? (
          <>
            <Input
              label="Cigar name"
              variant="underlined"
              onValueChange={setCustomCigarName}
              size="lg"
              placeholder="Enter your cigar name"
              isRequired
            />
          </>
        ) : (
          <>
            <Autocomplete
              label="Cigar"
              placeholder={cigarSearch ? cigarSearch : "Search for your cigar"}
              onInputChange={(i) => {
                setIsFetchingCigars(true);
                setCigarSearch(i);
              }}
              onSelectionChange={(k) =>
                setRecord((prev) => ({ ...prev, cigarId: k ? k.toString() : "" }))
              }
              size="lg"
              defaultSelectedKey={record.cigarId}
              defaultInputValue={cigarSearch}
              variant="underlined"
              isRequired
              listboxProps={{
                emptyContent: isFetchingCigars ? (
                  "Loading..."
                ) : cigarSearch.length > 0 ? (
                  <Button onPress={() => setCustomCigar(true)}>
                    Don&apos;t see your cigar? Add it
                    <AddIcon />
                  </Button>
                ) : (
                  "No results found."
                ),
              }}
            >
              {cigars.map((cigar) => {
                return (
                  <AutocompleteItem
                    key={cigar.id}
                    className="text-base"
                    style={{ color: colors.primaryText }}
                  >
                    {cigar.name}
                  </AutocompleteItem>
                );
              })}
            </Autocomplete>
          </>
        )}

        <div className="flex flex-col gap-1">
          <p className="text-sm">
            Image <span className="text-danger-400">*</span>
          </p>
          {imageSrc ? (
            <div className="flex flex-row items-center">
              <Image
                src={imageSrc}
                className="h-[100px] w-[100px] object-cover"
                alt="my cigar image"
              />
              <Button
                variant="flat"
                color="danger"
                className="ms-4"
                onPress={() => {
                  setImage(undefined);
                  setImageSrc("");
                }}
                isIconOnly
              >
                <CloseIcon />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col">
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0])}
                className="hidden"
              />
              <Button
                color="default"
                variant="bordered"
                onPress={() => fileInput.current?.click()}
              >
                <UploadIcon />
                Upload
              </Button>

              {/* <input
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
              color="primary"
              onPress={() => fileInput.current?.click()}
            >
              Upload
            </Button> */}
            </div>
          )}
        </div>

        <Textarea
          label="Review"
          placeholder="Enter your review"
          value={record.review}
          onValueChange={(review) => setRecord((prev) => ({ ...prev, review }))}
          className="text-base"
          size="lg"
          variant="underlined"
          isRequired
          labelPlacement="outside"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm ml-1">Rating ({record.rating})</p>

          <div className="flex flex-row">
            <Button
              onPress={() => {
                const newRating = Math.max(0, record.rating - 0.5);
                setRecord((prev) => ({ ...prev, rating: newRating }));
              }}
              variant="bordered"
              color="default"
              style={{
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
              defaultValue={2.5}
              max={5}
              onChange={(_, newValue) => {
                if (newValue) {
                  setRecord((prev) => ({ ...prev, rating: newValue }));
                }
              }}
              size="large"
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "rgba(255, 255, 255, 0.25)",
                },
              }}
            />
            <Button
              onPress={() => {
                const newRating = Math.min(5, record.rating + 0.5);
                setRecord((prev) => ({ ...prev, rating: newRating }));
              }}
              variant="bordered"
              color="default"
              style={{
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
        <Input
          label="Price (optional)"
          placeholder="0.00"
          size="lg"
          startContent="$"
          inputMode="decimal"
          type="number"
          value={record.price?.toString()}
          onValueChange={(value) => {
            let inputValue = value.replace(/[^0-9.]/g, ""); // Remove all non-numeric characters except the period
            if (inputValue) {
              const decimalParts = inputValue.split(".");
              if (decimalParts.length > 2) {
                inputValue = `${decimalParts[0]}.${decimalParts[1]}`; // Only allow one decimal point
              }
              if (decimalParts[1] && decimalParts[1].length > 2) {
                inputValue = `${decimalParts[0]}.${decimalParts[1].substring(0, 2)}`; // Limit to two decimal places
              }
            }
            const parsedInput = parseFloat(inputValue);
            setRecord((prev) => ({
              ...prev,
              price: parsedInput ? parsedInput : null,
            }));
          }}
          variant="underlined"
          isClearable
        />
        <Button
          onPress={onSave}
          isLoading={isSaving}
          isDisabled={!saveEnabled}
          color="success"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
